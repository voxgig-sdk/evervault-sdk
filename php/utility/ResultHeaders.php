<?php
declare(strict_types=1);

// Evervault SDK utility: result_headers

class EvervaultResultHeaders
{
    public static function call(EvervaultContext $ctx): ?EvervaultResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
