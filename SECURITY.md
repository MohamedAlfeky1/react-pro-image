# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in **react-pro-image**, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email: **[mohamedalfeky.dev@gmail.com](mailto:mohamedalfeky.dev@gmail.com)**

Include the following in your report:

- Description of the vulnerability
- Steps to reproduce
- Affected version(s)
- Potential impact

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Fix & disclosure**: Coordinated with the reporter

## Security Best Practices

This package follows these security practices:

- ✅ **Provenance attestation** — Every published version includes a Sigstore provenance signature linking the package to its source code and CI build
- ✅ **No runtime dependencies** — Zero third-party dependencies, reducing supply chain attack surface
- ✅ **Minimal permissions** — The package only renders images; it does not access network, storage, or any browser APIs beyond `IntersectionObserver`
- ✅ **Automated CI publishing** — Packages are built and published exclusively through GitHub Actions, never from local machines
