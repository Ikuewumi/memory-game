<script lang="ts">
    import { toast } from "@stores/toast";
</script>

<div role="alertdialog" aria-hidden={$toast <= ""}>aff</div>

<style lang="scss">
div {
    width: min(300px, 60vw);
    padding: 1rem 1.5rem;
    background: var(--clr-white);
    border-radius: 0.4rem;
    box-shadow: 0 2px 4px -1px hsl(var(--shadow-color) 20% / 50%);
    color: var(--clr-gray-800);
    font-size: var(--step-n1);
    position: fixed;
    inset: auto var(--space-s) var(--space-s) auto;
}
</style>
