<script lang="ts">
    import { addNewImage } from "@stores/image";
    export let src: string, alt: string;

    const showImage = () => addNewImage(src, alt);
</script>

<figure>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img {src} {alt} on:click={showImage} />
    <figcaption class="sr-only">{alt}</figcaption>
</figure>

<style lang="scss">
    figure {
        padding-inline: var(--grid-offset);
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
        --c-img-width: var(--img-width, 100px);
        --c-img-height: var(--img-height, min(400px, 80vw));


        @media (min-width: 768px) {
            
            --c-img-height: var(--img-height, min(350px, 100vw));

        }

        max-width: var(--c-img-height);
        max-height: min(400px, 50vh);
        object-fit: contain;
        border-radius: 0.4rem;
        box-shadow: 0 1px 5px -4px hsl(var(--shadow-color) 40% / 70%);
    }
</style>
