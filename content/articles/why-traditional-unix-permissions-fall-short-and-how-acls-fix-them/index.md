---
title: "Why Traditional Unix Permissions Fall Short — and How ACLs Fix Them"
date: 2026-01-09
draft: false
categories: ["Technical"]
tags: ["OS", "UNIX", "Security"]
readTime: "6 min read"
featuredImage: "/assets/articles/why-traditional-unix-permissions-fall-short-and-how-acls-fix-them/cat_thumbnail.jpg"
description: "A practical explanation of why the traditional rwx model breaks down in modern multi-user systems."
---

NB: This was taken from my assignment on Operating Systems course in college.

In order to secure systems from unauthorized access it is of the utmost importance to
implement some sort of access control in an operating system. A proper access control
Access control is a fundamental responsibility of an operating system – it stops actors of bad
faith from accessing confidential information and executing processes for misuse. Traditional
Unix-based systems use a very simple form of permission model. It assigns rwx (read, write
and execute) permission on a file based on three categories; owner, gorup and others.

It is easy to manage and gets the job done for most cases but fails in
multi-user systems. Modern workflows require managing shared servers, collaborative environments
with more fine grained access control. Traditional Unix access control cannot provide
administrators with these facilities. Hence in order to overcome these, modern Unix systems
support Extended ACLs or Extended Access Control Lists.

## Architectural limitations
The rwx model worked well when computational demands were simple compared to current
systems where multiple users are expected to be able to interact with it, each user with their
own levels of permissions.

```yaml
    rwx | rwx | rwx
    user group other
```

The traditional unix model had three fixed categories – owner, group and others. This ensured
read ( r ), write ( w ) and execution ( x ) permissions to a single user and single group. The
OS stored this information in a total of nine bits. This system is very simple by design, easy
to implement and fast to check.

This system falls apart when the need to provide different permissions on different files &
directory to individual users, or a better way to phrase this would be – can this system scale
when we have more multiple users? Moreover, with increasing complexity, .i.e. in shared
servers/ collaborative work/ temporary access, the three tier system does not make sense any
more. It only adds more administrative work.

Let’s say user “Agent A” owns a file “secret.txt”, it is assigned to a group called ‘CIA’ and
you want to give user “Recruit” access to the file without adding him/her to the group or
changing file permission to allow everyone to view the file. “rwx” model forces you into one
of these actions:
- Add “Recruit” to group “CIA”. 
Doing this will allow the user to view other files and folders the group has access to.
- Loosening “others” permission. Everyone gets access to the file.
- Change group ownership. Breaks the existing access control of the group.

## Granularity of Extended ACLs
The issues that we were facing with the three category rwx system are solved by Extended
ACLs. Permissions are no longer limited to three slots, a file can have multiple permission
entries and this happens with precision – each entry targets specific users and groups.
Permissions are no more hardcoded for a single user or group but rather are easier to change
and access.

Each entry defines read, write and execution permissions for separate groups and users, this
makes it easier to share, collaborate and grant temporary access to files and directories while
maintaining security.

## Mechanism of Extended ACLs
### POSIX ACL entry structure
In this system, instead of having fixed values in three categories, it contains a list of ACL
entries; each entry defining the level of access and to whom it has been assigned to (user /
group). There can be multiple ACL entries. It is an extended version of the traditional
3 permission model. A good way of thinking of it is a list of traditional permission entries.
Common ACL entry types:

```yaml
    user::rwx → owner permissions
    user:alice:r-- → named user
    group::r-x → owning group
    group:dev:rwx → named group
    mask::r-x → maximum allowed permissions for named users/groups
    other::--- → everyone else

```

A better way of visualizing is to think of it as a table of permissions instead of fixed bits.
These ACL entries are baked into the file system. The implementation is saved as attributes
to inodes. It helps fast check up on permission tables when file access is requested by users or
services while allowing fine-grained access control ensuring security.

### chmod vs setfacl/getfacl
`chmod` works on old permission models. It can change owner permissions, group
permissions and others permissions. It changes the mode bits in the inode. It cannot manage
ACL masks which apply to named users (user:recruit:r--) and name groups (group:cia:rwx)
because `chmod` does not understand the concept of named users or masks but rather just
change mode bits (rwx for owner/group/others). `chmod` should not be relied on for managing
ACL based permissions as it cannot; `setfacl` is required.

`getfacl` can read ACL entries filesystem metadata. It does not modify anything and is used to
read data from ACL entries. `getfacl` shows owner, group, others, named users, named groups
and mask. In order to modify ACL entries one needs to use `setfacl`.

`setfacl` is used to modify ACL entries. It can add user specific rules and group specific rules.
It can also change the mask. In addition to this, `setfacl` can also delete ACL entries.

To summarize, `chmod` is used to change traditional unix file permissions by changing mode
bits associated with the owner, group and others. It is limited within the user–group–others
permission model and does not support fine grained control. Unlike `chmod`, `getfacl` and
`setfacl` allows fine grained control by allowing viewing and modifying ACL entries for
named users and groups. It also supports masks.

### Permission-check priority logic (user vs group vs mask)
A well defined priority order is used to evaluate permissions when a process attempts to
access a file. This ensures a secure access control in presence of multiple ACL entries.

When trying to access a file:
1. OS checks if file owner and process owner are the same.
2. If they are the same then owner permissions are applied and no further checks are
done.
3. In case they are not the same the system checks for named user ACL entries
associated with the file with the same named user of the process.
4. If such an entry exists then the ACL mask is applied.
5. If no such entry is found the OS looks up to group ACL entries, both file owning
group and named groups associated with ACL entries.
6. If combined group ACL permissions are applied.
7. If none exists then the system denies permission and restricts the process from
accessing files.


## Conclusion
The traditional Unix permission model, based on the user–group–others structure, is simple
and efficient but insufficient for modern multi-user operating systems. Its rigid design limits
the ability to express fine-grained access control and often forces administrators to rely on
insecure or inefficient workarounds such as modifying group memberships or broadening
permissions.

Extended Access Control Lists address these limitations by allowing permissions to be
defined for multiple users and groups and by integrating these rules directly into filesystem
metadata. Through mechanisms such as ACL entries, masks, and a well-defined permission
evaluation order, ACLs provide precise, flexible, and secure access control while maintaining
compatibility with the existing Unix permission model. As a result, extended ACLs are
well-suited for complex collaborative environments where traditional permissions fall short.

## Resources
[Arch Linux. (n.d.). Access control lists. Arch Wiki.](https://wiki.archlinux.org/title/Access_Control_Lists)

[GeeksforGeeks. (n.d.). Linux/Unix access control lists (ACL).](https://www.geeksforgeeks.org/linux-unix/access-control-listsacl-linux/)