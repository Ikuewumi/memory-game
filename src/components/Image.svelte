<script lang="ts">
    import { showImage, imageData } from "@stores/image";

    const showImageModal = () => showImage.set(true);

    $: figcaptionClass = $imageData[0] === "" ? "text" : "sr-only";
</script>

<figure hidden={$imageData[0] === "" && $imageData[1] === ""}>
    <svg viewBox="0 0 24 24"><use href="#zoom-out"></use></svg>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
        src={$imageData[0]}
        alt={$imageData[1]}
        on:click={showImageModal}
        hidden={$imageData[0] === ""}
    />
    <figcaption class={figcaptionClass}>{$imageData[1]}</figcaption>
</figure>

<style lang="scss">
    figure {
        --c-img-width: var(--img-width, 100px);
        --c-img-height: var(--img-height, min(400px, 80vw));

        @media (min-width: 768px) {
            --c-img-height: var(--img-height, min(350px, 100vw));
        }

        padding-inline: var(--grid-offset);
        position: relative;
        flex: 0 0 auto;
        top: 0;
        height: fit-content;
        width: fit-content;
        margin-inline: auto;

        @media (min-width: 800px) {
            position: sticky;
            padding-inline: 0;
            margin-inline: 0;
        }
    }

    img {
        max-width: var(--c-img-height);
        max-height: min(400px, 50vh);
        object-fit: contain;
        border-radius: 0.4rem;
        box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 40% / 70%);
    }

    svg {
        position: absolute;
        inset: 0.5rem 0.5rem auto auto;
        pointer-events: none;
        background: var(--clr-gray-200);
        padding: 0.5rem;
        border-radius: 0.5rem;
        opacity: 0.35;
        --icon-size: 50px;

        @media (min-width: 800px) {
            --icon-size: 50px;
        }
    }

    figcaption.text {
        overflow-y: auto;
        max-width: var(--c-img-height);
        background: var(--clr-white);
        color: var(--clr-gray-800);
        border-radius: 0.75rem;
        border: var(--border);
        padding: 0.5rem 1rem 0.75rem;
        aspect-ratio: 16 / 9;
        place-content: center;
        text-align: center;
        font-weight: 500;
    }
</style>
