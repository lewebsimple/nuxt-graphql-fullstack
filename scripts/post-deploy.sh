#!/usr/bin/env bash
set -e

export PATH=$PATH:/opt/plesk/node/20/bin

LOG=~/logs/deploy.log

echo "Running post-deploy script" > $LOG
pnpm install >> $LOG
pnpm build >> $LOG
pnpm prisma migrate deploy >> $LOG
touch tmp/restart.txt
echo "Finished post-deploy script" >> $LOG