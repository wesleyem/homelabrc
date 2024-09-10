---
title: Installation
description: Install and run HomelabRC from Docker
icon: simple/docker
---

### With Docker Compose

```yaml
services:
  homepage:
    image: ghcr.io/wesleyem/homelabrc:latest
    container_name: homelabrc
    ports:
      - 3333:3333
    volumes:
      - /path/to/your/config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock # (optional) For docker integrations

volumes:
  config_data:
```

### With Docker Run

```bash
docker run -p 3333:3333 -v /path/to/your/config:/app/config -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/wesleyem/homelabrc:latest
```
