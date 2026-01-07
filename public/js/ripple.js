/**
 * PixiJS Ripple Effect for Images
 * Auto-initializes on images with .ripple-image class
 */

(function() {
    'use strict';

    // Check if PixiJS is available
    if (typeof PIXI === 'undefined') {
        console.warn('PixiJS not loaded. Ripple effect disabled.');
        return;
    }

    // Store active applications
    const rippleInstances = new Map();

    /**
     * Create noise texture for displacement
     */
    function createNoiseTexture(size = 256) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;

        // Generate noise
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = 255;    // A
        }

        ctx.putImageData(imageData, 0, 0);
        return PIXI.Texture.from(canvas);
    }

    /**
     * Initialize ripple effect for a single image
     */
    function initRipple(imageElement) {
        const container = imageElement.closest('.ripple-image-container');
        if (!container) return;

        const canvas = container.querySelector('.ripple-canvas');
        if (!canvas) return;

        // Skip if already initialized
        if (rippleInstances.has(imageElement)) {
            return;
        }

        // Get image dimensions
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (width === 0 || height === 0) {
            return;
        }

        // Check WebGL support
        const isWebGLSupported = PIXI.utils.isWebGLSupported();
        if (!isWebGLSupported) {
            // Fallback: show original image
            imageElement.style.opacity = '1';
            return;
        }

        try {
            // Create PixiJS Application
            const app = new PIXI.Application({
                view: canvas,
                width: width,
                height: height,
                transparent: true,
                antialias: true,
                autoDensity: true,
                resolution: window.devicePixelRatio || 1
            });

            // Load image texture
            const imageTexture = PIXI.Texture.from(imageElement.src);
            
            // Create sprite from image
            const sprite = new PIXI.Sprite(imageTexture);
            sprite.width = width;
            sprite.height = height;
            app.stage.addChild(sprite);

            // Create displacement filter with noise texture
            const noiseTexture = createNoiseTexture(256);
            const displacementFilter = new PIXI.filters.DisplacementFilter(
                new PIXI.Sprite(noiseTexture),
                0
            );
            displacementFilter.scale.x = 0;
            displacementFilter.scale.y = 0;
            
            sprite.filters = [displacementFilter];

            // Animation state
            let time = 0;
            let targetScale = 0;
            let currentScale = 0;
            let hoverIntensity = 0;

            // Idle animation (subtle movement)
            function animate() {
                if (!rippleInstances.has(imageElement)) {
                    return; // Stop if removed
                }

                time += 0.01;
                
                // Idle ripple
                const idleOffset = Math.sin(time) * 2;
                displacementFilter.scale.x = currentScale + idleOffset;
                displacementFilter.scale.y = currentScale + idleOffset;

                // Smooth interpolation to target
                currentScale += (targetScale - currentScale) * 0.1;
                hoverIntensity *= 0.95; // Decay hover effect

                app.renderer.render(app.stage);
                requestAnimationFrame(animate);
            }

            // Mouse interaction
            function onMouseMove(event) {
                const rect = container.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                // Create ripple at mouse position
                hoverIntensity = 1;
                targetScale = 15 + hoverIntensity * 10;

                // Update displacement sprite position for localized effect
                displacementFilter.scale.x = targetScale;
                displacementFilter.scale.y = targetScale;
            }

            function onMouseLeave() {
                targetScale = 0;
                hoverIntensity = 0;
            }

            function onMouseClick(event) {
                const rect = container.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                // Stronger ripple on click
                hoverIntensity = 1.5;
                targetScale = 25;
                
                // Reset after animation
                setTimeout(() => {
                    targetScale = 0;
                }, 300);
            }

            // Attach event listeners
            container.addEventListener('mousemove', onMouseMove);
            container.addEventListener('mouseleave', onMouseLeave);
            container.addEventListener('click', onMouseClick);

            // Handle resize
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width: newWidth, height: newHeight } = entry.contentRect;
                    if (newWidth > 0 && newHeight > 0) {
                        app.renderer.resize(newWidth, newHeight);
                        sprite.width = newWidth;
                        sprite.height = newHeight;
                    }
                }
            });
            resizeObserver.observe(container);

            // Start animation
            animate();

            // Hide original image, show canvas
            imageElement.style.opacity = '0';
            canvas.style.pointerEvents = 'auto';

            // Store instance for cleanup
            rippleInstances.set(imageElement, {
                app: app,
                container: container,
                resizeObserver: resizeObserver,
                cleanup: function() {
                    container.removeEventListener('mousemove', onMouseMove);
                    container.removeEventListener('mouseleave', onMouseLeave);
                    container.removeEventListener('click', onMouseClick);
                    resizeObserver.disconnect();
                    app.destroy(true);
                }
            });

        } catch (error) {
            console.error('Error initializing ripple effect:', error);
            // Fallback: show original image
            imageElement.style.opacity = '1';
        }
    }

    /**
     * Initialize all ripple images
     */
    function initAllRipples() {
        const rippleImages = document.querySelectorAll('.ripple-image');
        rippleImages.forEach(image => {
            // Wait for image to load
            if (image.complete) {
                initRipple(image);
            } else {
                image.addEventListener('load', () => initRipple(image), { once: true });
            }
        });
    }

    /**
     * Cleanup removed elements
     */
    function cleanupRemovedElements() {
        rippleInstances.forEach((instance, imageElement) => {
            if (!document.contains(imageElement)) {
                instance.cleanup();
                rippleInstances.delete(imageElement);
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllRipples);
    } else {
        initAllRipples();
    }

    // Re-initialize on dynamic content changes
    const observer = new MutationObserver(() => {
        cleanupRemovedElements();
        initAllRipples();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        rippleInstances.forEach(instance => instance.cleanup());
        rippleInstances.clear();
    });
})();

