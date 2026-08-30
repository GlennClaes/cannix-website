# Changelog

All notable changes to this project will be documented in this file.

The project uses semantic versioning and automatic GitHub releases for breaking changes only.

## Unreleased

- Notable code and documentation updates for production hardening, multilingual routing, and deployment documentation.

## Release policy

A new major release is created automatically when a commit on `main` contains a breaking change indicator:

- `feat!:` or `fix!:`
- `!` in the commit subject
- `BREAKING CHANGE:` in the commit body

The resulting tag is formatted as `vX.0.0` and a GitHub Release is published automatically.
