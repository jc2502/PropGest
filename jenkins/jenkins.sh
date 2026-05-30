#!/bin/bash
# Fix Docker socket permissions so jenkins user can use it
if [ -S /var/run/docker.sock ]; then
    chown root:docker /var/run/docker.sock
fi

# Run original Jenkins entrypoint
exec /usr/local/bin/jenkins.sh "$@"
