<template>
    <card class="nova-horizon flex flex-col">
        <div :class="darkModeClass()">
            <nova-horizon-card-header class="p-3">
                <span v-if="$attrs.card.horizon && $attrs.card.horizon.name">{{ $attrs.card.horizon.name }} -</span>
                Current Workload
            </nova-horizon-card-header>

            <nova-horizon-table
                v-if="workload.length"
                :header="[
                    { label: 'Queue', class: 'pl-3 w-1/3' },
                    { label: 'Processes', class: 'w-1/6' },
                    { label: 'Jobs', class: 'w-1/6' },
                    { label: 'Wait', class: 'pr-3 text-right w-1/3' },
                ]"
            >
                <tr v-for="queue in workload">
                    <td :class="cellClass('pl-3')">
                        {{ queue.name.replace(/,/g, ', ') }}
                    </td>
                    <td :class="cellClass()">
                        {{ queue.processes ? queue.processes.toLocaleString() : 0 }}
                    </td>
                    <td :class="cellClass()">
                        {{ queue.length ? queue.length.toLocaleString() : 0 }}
                    </td>
                    <td :class="cellClass('pr-3 text-right')">
                        {{ humanTime(queue.wait) }}
                    </td>
                </tr>
            </nova-horizon-table>

            <nova-horizon-not-active v-else></nova-horizon-not-active>
        </div>
    </card>
</template>

<script>
import Card from '../../templates/Card';

export default {
    extends: Card,

    data() {
        return {
            ready: false,
            workload: [],
            timeout: null
        }
    },

    /**
     * Mounted.
     */
    mounted() {
        this.fetchWorkloadPeriodically();
    },

    beforeUnmount () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    },

    methods: {
        /**
         * Fetch stats from horizon.
         */
        async fetchWorkload() {
            try {
                const response = await this.getHorizonRequest('api/workload');

                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log('error: ', error);
                return null;
            }
        },

        /**
         * Fetch stats periodically with Promise and timeout.
         */
        async fetchWorkloadPeriodically() {
            const fetch = await this.fetchWorkload();

            console.log('response ', fetch);
            if (Array.isArray(fetch)) {
                if (fetch.length > 0) {
                    this.workload = fetch;
                }
            }
            // Something went wrong
            if (fetch === null) {
                this.timeout = null;
                return;
            }

            this.timeout = setTimeout(() => {
                this.fetchWorkloadPeriodically();
            }, 15000);
        },

        /**
         * @returns {string}
         */
        humanTime(time) {
            return moment.duration(time, "seconds").humanize().replace(/^(.)|\s+(.)/g, function ($1) {
                return $1.toUpperCase();
            });
        },
    },
}
</script>
