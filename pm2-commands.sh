#!/bin/bash
# PM2 Backend Yönetim Script'i

SERVER_PASS="joW3NVXss9Bo"
SERVER_USER="root"
SERVER_HOST="207.2.123.95"

case "$1" in
  start)
    echo "🚀 Backend başlatılıyor..."
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "cd /root/sera/backend && pm2 start server.js --name backend && pm2 save"
    ;;
  stop)
    echo "⏸️  Backend durduruluyor..."
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "pm2 stop backend"
    ;;
  restart)
    echo "♻️  Backend restart ediliyor..."
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "pm2 restart backend"
    ;;
  status)
    echo "📊 Backend durumu:"
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "pm2 list"
    ;;
  logs)
    echo "📋 Backend logları:"
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "pm2 logs backend --lines 30 --nostream"
    ;;
  *)
    echo "Kullanım: $0 {start|stop|restart|status|logs}"
    exit 1
    ;;
esac
