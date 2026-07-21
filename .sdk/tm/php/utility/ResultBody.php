<?php
declare(strict_types=1);

// Evervault SDK utility: result_body

class EvervaultResultBody
{
    public static function call(EvervaultContext $ctx): ?EvervaultResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
