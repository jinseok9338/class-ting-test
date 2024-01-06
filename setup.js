import sessionStorage from 'sessionstorage-for-nodejs'
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
global.sessionStorage = sessionStorage


expect.extend(matchers);

afterEach(() => {
    cleanup();
});