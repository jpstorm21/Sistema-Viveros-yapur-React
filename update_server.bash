#HOW TO UPDATE SERVER VERSION

# Move to html folder
cd /var/www/html/

# Remove old version
#rm -rf ClinicaJuridica/*
#rm -rf ClinicaJuridica/.babelrc
#rmdir ClinicaJuridica/
rm -rf SIVRIDTECOLD
mv SIVRIDTEC/ SIVRIDTECOLD/

# Export last version
svn export "http://cin.ucn.cl/svn/cin/proyectos/SIVRIDT EC/trunk"
mv trunk/ SIVRIDTEC/

# Copy uploads files
cp -r SIVRIDTECOLD/dist/static/upload SIVRIDTEC/dist/static/

# cd SIVRIDTEC
# pm2 start dist/server.js -n sivridtec
# Restart the app
pm2 restart sivridtec

# Verify the app is running
pm2 list

# Config nginx for proxy pass and static files handle.
# nano /etc/nginx/conf.d/reverseproxy.conf
# Reload updated config.
# nginx -s reload