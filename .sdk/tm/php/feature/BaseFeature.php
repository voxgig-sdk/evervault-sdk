<?php
declare(strict_types=1);

// Evervault SDK base feature

class EvervaultBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EvervaultContext $ctx, array $options): void {}
    public function PostConstruct(EvervaultContext $ctx): void {}
    public function PostConstructEntity(EvervaultContext $ctx): void {}
    public function SetData(EvervaultContext $ctx): void {}
    public function GetData(EvervaultContext $ctx): void {}
    public function GetMatch(EvervaultContext $ctx): void {}
    public function SetMatch(EvervaultContext $ctx): void {}
    public function PrePoint(EvervaultContext $ctx): void {}
    public function PreSpec(EvervaultContext $ctx): void {}
    public function PreRequest(EvervaultContext $ctx): void {}
    public function PreResponse(EvervaultContext $ctx): void {}
    public function PreResult(EvervaultContext $ctx): void {}
    public function PreDone(EvervaultContext $ctx): void {}
    public function PreUnexpected(EvervaultContext $ctx): void {}
}
