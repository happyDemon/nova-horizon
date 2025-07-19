<?php

namespace HappyDemon\NovaHorizon;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class NovaHorizonServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/nova-horizon.php', 'nova-horizon');

        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            Nova::script('nova-horizon-cards', __DIR__.'/../dist/js/cards.js');
            Nova::style('nova-horizon-cards', __DIR__.'/../dist/css/cards.css');
        });
    }

    /**
     * Register the card's routes.
     *
     * @return void
     */
    protected function routes(): void
    {
        if ($this->app->routesAreCached()) {
            return;
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->publishes([
            __DIR__.'/../config/nova-horizon.php' => config_path('nova-horizon.php'),
        ], 'nova-horizon');
    }
}
