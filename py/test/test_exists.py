# Evervault SDK exists test

import pytest
from evervault_sdk import EvervaultSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EvervaultSDK.test(None, None)
        assert testsdk is not None
