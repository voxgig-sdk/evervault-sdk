<?php
declare(strict_types=1);

// Evervault SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EvervaultMakeContext
{
    public static function call(array $ctxmap, ?EvervaultContext $basectx): EvervaultContext
    {
        return new EvervaultContext($ctxmap, $basectx);
    }
}
