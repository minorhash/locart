if [ -z $1 ];then
    echo "$0 repo"
else
git checkout $1
fi
