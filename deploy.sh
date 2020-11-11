echo "Uploading..."
aws s3 sync dist s3://symbioticon/scripts/ --delete --exclude ".DS_Store" --profile etvas_symbioticon 
echo "Invalidating..."
aws cloudfront create-invalidation --distribution-id ELHD6RXAI459C --paths '/*' --profile etvas_symbioticon > /dev/null
echo "Done."
