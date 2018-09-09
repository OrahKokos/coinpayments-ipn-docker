# coinpayments-ipn-docker
Simple Coinpayments IPN processing

Docker image: `orahkokos/coinpayments-ipn-docker`

## Usage
```bash
cp docker-compose.override.example.yml docker-compose.override.yml 
```

Add your **Merchant ID** and **IPN secret** to `docker-compose.override.yml`

```bash
docker-compose up -d 
```