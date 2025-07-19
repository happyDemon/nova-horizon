import {values, keys} from 'lodash';
import {prepareHorizonRequest} from '../helpers'

export default {
    props: [
        'card',
    ],

    /**
     * Data.
     */
    data() {
        return {
            ready: false,
            stats: {},
        }
    },

    /**
     * Mounted.
     */
    mounted() {
        this.fetchStatsPeriodically(this.$attrs.card.horizon.url);
    },

    /**
     * Destroyed.
     */
    beforeUnmount() {
        clearTimeout(this.timeout);
    },

    methods: {
        /**
         * Manual dark mode.
         */
        darkModeClass() {
            let activeDarkMode = localStorage.novaTheme === 'dark';

            let prefersDarkMode = (!('novaTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

            return (activeDarkMode || prefersDarkMode) ? 'dark' : '';
        },

        /**
         * Fetch stats from horizon.
         */
        async fetchStats() {
            try {
                const response = await prepareHorizonRequest(this.$attrs.card.horizon, 'api/stats');

                return response.data;
            } catch (error) {
                return null;
            }

        },

        /**
         * Fetch stats periodically with Promise and timeout.
         */
        async fetchStatsPeriodically() {
            const fetch = await this.fetchStats();

            if (fetch === null) {
                this.timeout = null;
                return;
            }

            this.stats = fetch;

            if (values(fetch.wait)[0]) {
                this.stats.max_wait_time = values(fetch.wait)[0];
                this.stats.max_wait_queue = keys(fetch.wait)[0].split(':')[1];
            }

            this.timeout = setTimeout(() => {
                this.fetchStatsPeriodically();
            }, 10000);
        },

        /**
         * Determine the unit for the given timeframe.
         */
        determinePeriod(minutes) {
            return moment.duration(
                moment().diff(moment().subtract(minutes, "minutes"))
            ).humanize().replace(/^An?/i, '');
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
