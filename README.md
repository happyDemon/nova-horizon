# Nova Horizon

[![Latest Version on Packagist](https://img.shields.io/packagist/v/happydemon/nova-horizon.svg?style=flat-square)](https://packagist.org/packages/happydemon/nova-horizon)
[![Total Downloads](https://img.shields.io/packagist/dt/happydemon/nova-horizon.svg?style=flat-square)](https://packagist.org/packages/happydemon/nova-horizon)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

Add statistics to your Nova dashboard for 1 or more applications that are running horizon.

This is a fork of [appstract/nova-horizon](https://github.com/appstract/nova-horizon), some key differences:
- You can configure multiple horizon instances
- Data auto-refresher get destroyed when the components get unmounted

![dashboard](docs/dashboard.png)

## Installation

You can install the package via composer:

``` bash
composer require happydemon/nova-horizon
php artisan vendor:publish --tag nova-horizon
```

## Configuration

You will have to define your horizon instances in the `nova-horizon.php` config file.

```php
<?php
 return [
     'default_instance' => 'default',

     'instances' => [
         'default' => [
             'url' => '',
             'auth' => [
                // Delete this section if not using basic auth to autheticate horizon requests
             ],
             'headers' => [
                // if using headers for authentication, add them here
             ]
         ],
     ]
 ];

```

The instance key can be passed to the cards by calling `->horizonInstance('{KEY}')`.

## Usage

You can add cards to the main dashboard or your own dashboard(s).

```php
class Main extends Dashboard
{
    public function cards()
    {
        return [
            \HappyDemon\NovaHorizon\Cards\Stats::make()
                ->horizonInstance('default'),
            \HappyDemon\NovaHorizon\Cards\Workload::make(),
            \HappyDemon\NovaHorizon\Cards\PendingJobs::make(),
            \HappyDemon\NovaHorizon\Cards\FailedJobs::make(),
            \HappyDemon\NovaHorizon\Cards\CompletedJobs::make(),

            // Stats as separate cards
            \HappyDemon\NovaHorizon\Cards\JobsPerMinute::make(),
            \HappyDemon\NovaHorizon\Cards\RecentJobsCount::make(),
            \HappyDemon\NovaHorizon\Cards\FailedJobsCount::make(),
            \HappyDemon\NovaHorizon\Cards\Status::make(),
            \HappyDemon\NovaHorizon\Cards\TotalProcesses::make(),
            \HappyDemon\NovaHorizon\Cards\MaxWaitTime::make(),
            \HappyDemon\NovaHorizon\Cards\MaxRuntime::make(),
            \HappyDemon\NovaHorizon\Cards\MaxThroughput::make(),
        ];
    }
}
```

## Contributing

Contributions are welcome, [thanks to all the contributors](https://github.com/happydemon/nova-horizon/graphs/contributors) :)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
