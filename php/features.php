<?php
declare(strict_types=1);

// Evervault SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EvervaultFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EvervaultBaseFeature();
            case "test":
                return new EvervaultTestFeature();
            default:
                return new EvervaultBaseFeature();
        }
    }
}
