usr=admin
pss=bulk2010
host=tmsm.bulks.jp

lftp -u $usr,$pss $host -e "\
cd exp/biz/cafe/1bul
pwd
lpwd
mirror -R views
mirror -R routes
exit"
