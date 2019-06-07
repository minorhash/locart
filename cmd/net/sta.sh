sta=$(netstat -lpn |grep 3000|awk '{ print $7 }')

if [ -z $sta ];then
    echo "no proc"
else
echo $sta

str=${sta:0: -5}
echo $str
kill $str
fi
