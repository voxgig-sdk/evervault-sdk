<?php
declare(strict_types=1);

// Evervault SDK utility: prepare_body

class EvervaultPrepareBody
{
    public static function call(EvervaultContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
