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

        @media (min-width: 768px) {
            position: sticky;
            padding-inline: 0;
        }
    }
    img {
        --c-img-width: var(--img-width, 100px);
        --c-img-height: var(--img-height, min(300px, 50vh));

        max-height: var(--c-img-height);
    }
</style>
