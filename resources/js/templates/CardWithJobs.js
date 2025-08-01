import phpunserialize from 'phpunserialize';
import {prepareHorizonPostRequest, prepareHorizonRequest} from "../helpers";

export default {
    /**
     * Data.
     */
    data() {
        return {
            ready: false,
            hasNewEntries: false,
            loadingNewEntries: false,
            page: 1,
            perPage: 50,
            totalPages: 1,
            jobs: [],
            modal: null,
        }
    },

    /**
     * Mounted.
     */
    mounted() {
        this.loadJobs();

        this.refreshJobsPeriodically();
    },

    /**
     * Destroyed.
     */
    destroyed() {
        clearInterval(this.interval);
    },

    methods: {
        /**
         * Classes for table cells.
         */
        cellClass(more = null) {
            return `p-2 border-t border-gray-100 dark:border-gray-700 whitespace-nowrap dark:bg-gray-800 ${more}`;
        },

        /**
         * Manual dark mode.
         */
        darkModeClass() {
            let activeDarkMode = localStorage.novaTheme === 'dark';

            let prefersDarkMode = (! ('novaTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

            return (activeDarkMode ||  prefersDarkMode) ? 'dark' : '';
        },

        /**
         * Extract the job base name.
         */
        jobBaseName(name) {
            if (! name.includes('\\')) return name;

            var parts = name.split('\\');

            return parts[parts.length - 1];
        },

        /**
         * Pretty print serialized job.
         *
         * @param data
         * @returns {string}
         */
        prettyPrintJob(data) {
            return data.command && ! data.command.includes('CallQueuedClosure')
                ? phpunserialize(data.command)
                : data;
        },

        /**
         * Load the jobs for the previous page.
         */
        previous() {
            this.loadJobs(
                (this.page - 2) * this.perPage
            );

            this.page -= 1;

            this.hasNewEntries = false;
        },

        /**
         * Load the jobs for the next page.
         */
        next() {
            this.loadJobs(
                this.page * this.perPage
            );

            this.page += 1;

            this.hasNewEntries = false;
        },

        /**
         * Checks if a modal needs to be open.
         */
        visibleModal(job) {
            return this.modal && this.modal.id == job.id;
        },

        /**
         * Open a modal.
         */
        openModal(job) {
            this.modal = job;
        },

        /**
         * Close a modal.
         */
        closeModal() {
            this.modal = null;
        },

        /**
         * Format the given date with respect to timezone.
         */
        formatDate(unixTime) {
            return moment(unixTime * 1000).add(new Date().getTimezoneOffset() / 60);
        },

        /**
         * Convert to human readable timestamp.
         */
        readableTimestamp(timestamp) {
            return this.formatDate(timestamp).format('YYYY-MM-DD HH:mm:ss');
        },

        getHorizonRequest(endpoint, options = {}) {
            return prepareHorizonRequest(this.$attrs.card.horizon, endpoint, options);
        },

        postHorizonRequest(endpoint, options = {}) {
            return prepareHorizonPostRequest(this.$attrs.card.horizon, endpoint, options);
        }
    },
}
