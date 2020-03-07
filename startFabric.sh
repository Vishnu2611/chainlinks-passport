./bin/configtxgen -profile ChainlinksGenesis -channelID mychannel -outputBlock ./channel-artifacts/genesis.block

./bin/configtxgen -profile Chainlinks_Channel -outputCreateChannelTx ./channel-artifacts/Chainlinks_Channel.tx -channelID auctionchannel


./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Passportseva_Channelanchors.tx -channelID auctionchannel -asOrg PassportsevaMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Police_Channelanchors.tx -channelID auctionchannel -asOrg PoliceMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Airport_Channelanchors.tx -channelID auctionchannel -asOrg AirportMSP

# export CORE_PEER_LOCALMSPID=
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer0.passportseva.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/users/Admin@passportseva.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer1.passportseva.chainlinks.com:8051