<script lang="ts">
    import { toast } from "@stores/toast";
</script>

<div role="alertdialog" aria-hidden={$toast <= ""}>aff</div>

<style lang="scss">
div {
    max-width: min(300px, 60vw);
    padding: 0.5rem 0.75rem;
    background: var(--clr-white);
    border-radius: 0.4rem;
    box-shadow: 
        0 1px 5px -4px hsl(var(--shadow-color) 20% / 80%),
        0 0 0px 2px hsl(var(--shadow-color) 40% / 20%);
        
    color: var(--clr-gray-800);
    font-size: var(--step-n1);
    position: fixed;
    inset: auto var(--space-s) var(--space-s) auto;
    transform-origin: bottom-left;
    transition: 1000ms ease-out;


    &[aria-hidden="true"] {
        transform: scale(0);
    }
}
</style>
