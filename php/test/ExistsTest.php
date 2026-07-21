<?php
declare(strict_types=1);

// Evervault SDK exists test

require_once __DIR__ . '/../evervault_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EvervaultSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
