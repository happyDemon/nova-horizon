<?php

namespace HappyDemon\NovaHorizon\Cards;

use Laravel\Nova\Card as NovaCard;

class Card extends NovaCard
{
    public function __construct($component = null)
    {
        parent::__construct($component);

        // Configure the default instance
        $this->horizonInstance();
    }

    public function horizonInstance(?string $instance = null): self
    {
        $instance = $instance ?: config('nova-horizon.default');

        $this->withMeta([
            'horizon' => array_merge(config('nova-horizon.instances.'.$instance) ?: [], ['name' => $instance ?: ''])
        ]);

        return $this;
    }
    /**
     * The width of the card (1/3, 1/2, or full).
     *
     * @var string
     */
    public $width = '1/4';
}
