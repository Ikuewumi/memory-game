<script lang="ts">
    import { addNewImage, imageData } from "@/stores/image";

    const closeModal = () => addNewImage()
</script>

<div role="dialog" aria-hidden={$imageData.at(0) <= ""} on:click|self={closeModal}>
    <button title="Close Image Modal" on:click={closeModal}>
        <svg viewBox="0 0 24 24"><use href="#close"/></svg>
    </button>
    <figure>
        <img src={$imageData[0]} alt={$imageData[1]} />
        <figcaption>{$imageData[1]}</figcaption>
    </figure>
</div>

<style lang="scss">
    [role="dialog"] {
        display: none;
        padding-top: 2rem;
        position: fixed;
        inset: 0;
        background: hsl(var(--shadow-color) 10% / 95%);
        backdrop-filter: blur(var(--space-2xs));
        color: var(--clr-white);
        z-index: var(--z-dialog);
        
        &[aria-hidden="false"] {
            display: grid;
        }
    }

    button {
        --width: 40px;
        position: fixed;
        inset: var(--space-2xs) var(--space-2xs) auto auto;
        background: var(--clr-gray-300);
        color: var(--clr-gray-900);
        width: var(--width);
        aspect-ratio: 1 / 0.85;
        outline-offset: -3px;
        font-size: var(--step-1);
        display: flex;
        place-content: center;
        border: none;
        border-radius: var(--space-3xs);
        box-shadow: 0 0 5px -1px hsl(var(--shadow-color) 10% / 70%);
        letter-spacing: -1px;
        cursor: pointer;
    }

    figure {
        display: grid;
        margin-inline: auto;
        height: fit-content;
        gap: var(--space-xs);
        //max-height: min(700px, 70vh); 
        text-align: center;
    }

    figcaption {
        opacity: 0.65;
    }

    img {
        max-height: min(400px, 70vh); 
    }
</style>
