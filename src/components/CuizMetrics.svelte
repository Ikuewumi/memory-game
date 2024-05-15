<script lang="ts">
    import CuizMetricsCard from "./CuizMetricsCard.svelte";
    import { DEFAULT_MODAL_STATES, modals, resetModals } from "@/stores/modals";
    import { metrics, metricsData, DEFAULT_USER_METRICS } from "@/stores/metrics";
    import { gameData } from "@/stores/game";
    import Image from "./Image.svelte";
    import type { Metrics } from "@/types";


    // import type { Metrics, MetricsData, Question } from "@/types"
    let data:Metrics

    $: {
        if ($modals.metrics) data = metrics.getUserMetrics($metricsData)
        else data = DEFAULT_USER_METRICS
    }



    const playAgain = () => {
        return modals.set({
            ...DEFAULT_MODAL_STATES,
            "options": true,
        }) 
    }

    const continueGame = () => {
        return resetModals()
    }
</script>

<div class="cuiz-metrics-wrapper" role="presentation" data-grid data-open={$modals.metrics}
    id="modals-metrics"
    inert={!$modals.metrics}
    aria-hidden={!$modals.metrics}>
    
    <h2 class="cuiz-metrics-message">📈 Quiz Statistics</h2>

    <ul class="cuiz-metrics-list">
        <li class="cuiz-metrics-list-item"><CuizMetricsCard icon="#percent" title="accuracy" content={`${data.acuracy}%`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard icon="#percent" title="questions answered" content={`${data.percentAnswered}%`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard title="question count" content={`${data.numberOfQuestions}`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard title="question attempts" content={`${data.numberOfAnsweredQuestions}`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard title="correct questions" content={`${data.numberOfCorrectQuestions}`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard title="failed questions" content={`${data.numberOfWrongQuestions}`} /></li>
        <li class="cuiz-metrics-list-item"><CuizMetricsCard icon="#timer" title="time taken" content={`${data.timeTaken}s`} /></li>
    </ul> 

    {#if data.numberOfWrongQuestions > 0}
        <h3 class="cuiz-metrics-questions-heading">❌ Failed Questions</h3>

        <div class="cuiz-metrics-questions-wrapper">
        {#if $gameData.image}
            <Image src={$gameData.image} alt="title" />
        {/if}
        <ul class="cuiz-metrics-questions-list">
            {#each data.wrongQuestions as question, i (i) }
                <li class="cuiz-metrics-questions-li">
                    <div class="cuiz-metrics-questions-item">
                        <p class="cuiz-metrics-questions-p"><strong>Question </strong> {question.question}</p>
                        <p class="cuiz-metrics-questions-p"><strong>Answer </strong> {question.answer}</p>
                    </div>
                </li>
            {/each}

        </ul>

        </div>
    {/if}

    <div class="cuiz-metrics-button-bar">
        <button class="cuiz-metrics-button" on:click={continueGame}>Continue</button>
        <button class="cuiz-metrics-button" on:click={playAgain}>Play Again</button>
    </div>


</div>

<style lang="scss">
    .cuiz-metrics {
        &-message {
            font-size: var(--step-3);
            font-weight: 600;
            text-align: center;
        }

        &-wrapper {
            grid-column: full;
            position: fixed;
            z-index: var(--z-dialog);
            inset: 0;
            background: var(--clr-gray-200);
            display: grid;
            transform: translateX(100vw);
            place-content: start center;
            padding-top: 1rem;
            pointer-events: none;
            transition: 400ms transform ease-out, 0ms opacity;
            overflow-y: auto;
            &[data-open=true] {
                pointer-events: auto;
                transform: translateX(0vmax);
            }
        }
    

        &-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(auto, 250px));
            gap: 1.5rem;
            align-content: start;
            justify-content: center;
            list-style: none;
            margin-top: 1.5rem;
        }


        &-list-item {
            display: contents;
        }

        &-button-bar {
            display: flex;
            margin-top: 2.5rem;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            background: var(--clr-gray-300);
            background: var(--text-gradient);
            border-radius: 0.4rem;
            box-shadow: 0px 0px 3px -2px;
            backdrop-filter: blur(4px);
            grid-column: content;
            margin-inline: auto;
            position: sticky;
            inset: auto auto 0.5rem auto;
        }

        &-button {
            background: var(--clr-gray-100);
            border: 1px solid hsl(var(--shadow-color-dark) / 20%);
            border-radius: 0.5rem;
            color: var(--clr-gray-900);
            padding: 0.65rem 1.25rem 0.75rem;
            outline-offset: -4px;
            cursor: pointer;
            letter-spacing: 0.5px;
            //font-family: var(--font-heading);
            font-size: var(--step-n1);
            text-transform: uppercase;
            font-weight: 600;
        }
   }



.cuiz-metrics-questions {



        &-heading {
            font-size: var(--step-3);
            font-weight: 600;
            text-align: center;
            margin-block: 2rem 1.5rem;
        }

        &-wrapper {
            display: flex;
            align-items: start;
            justify-content: center;
            gap: 2rem 1rem;
            flex-direction: column;


            @media (min-width: 800px) {
                flex-direction: row;
            }
        }

        &-list {
            display: grid;
            gap: 0.5rem;
        }


        &-li {
            display: contents;
        }

        &-item {
            background: var(--clr-white);
            border: 1px solid hsl(var(--shadow-color-dark) / 12.5%);
            padding: 0.75rem 1rem 0.85rem;
            border-radius: 0.5rem;
            display: grid;
            gap: 0.25rem;
        }

        &-p strong {
            font-weight: 600;
            // text-decoration: underline;
            font-family: var(--font-heading);
            background: hsl(var(--shadow-color-dark) / 10%);
        }
    


    }
</style>
