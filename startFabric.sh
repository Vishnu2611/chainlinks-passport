./bin/configtxgen -profile ChainlinksGenesis -channelID mychannel -outputBlock ./channel-artifacts/genesis.block

./bin/configtxgen -profile Chainlinks_Channel -outputCreateChannelTx ./channel-artifacts/Chainlinks_Channel.tx -channelID auctionchannel


./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Passportseva_Channelanchors.tx -channelID auctionchannel -asOrg PassportsevaMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Police_Channelanchors.tx -channelID auctionchannel -asOrg PoliceMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Airport_Channelanchors.tx -channelID auctionchannel -asOrg AirportMSP


# export CORE_PEER_LOCALMSPID=PassportsevaMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer0.passportseva.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/users/Admin@passportseva.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer0.passportseva.chainlinks.com:7051

# export CORE_PEER_LOCALMSPID=PassportsevaMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer1.passportseva.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/users/Admin@passportseva.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer1.passportseva.chainlinks.com:8051

# export CORE_PEER_LOCALMSPID=PoliceMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/peers/peer0.police.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/users/Admin@police.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer0.police.chainlinks.com:9051

# export CORE_PEER_LOCALMSPID=PoliceMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/peers/peer1.police.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/users/Admin@police.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer1.police.chainlinks.com:10051

# export CORE_PEER_LOCALMSPID=AirportMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/peers/peer0.airport.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/users/Admin@airport.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer0.airport.chainlinks.com:11051

# export CORE_PEER_LOCALMSPID=AirportMSP
# export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/peers/peer1.airport.chainlinks.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/users/Admin@airport.chainlinks.com/msp
# export CORE_PEER_ADDRESS=peer1.airport.chainlinks.com:12051

# peer channel create -o orderer.chainlinks.com:7050 -f ./channel-artifacts/Chainlinks_Channel.tx -c auctionchannel --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem

# peer channel update -o orderer.chainlinks.com:7050 -f ./channel-artifacts/Passportseva_Channelanchors.tx -c auctionchannel --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem

# peer chaincode instantiate -o orderer.chainlinks.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem -C auctionchannel -n pass -l node -v 1.0 -c '{"Args":[]}' -P "AND ('PassportsevaMSP.peer','PoliceMSP.peer','AirportMSP.peer')"

# peer chaincode invoke -o orderer.chainlinks.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem  -C auctionchannel -n pass --peerAddresses peer0.passportseva.chainlinks.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer0.passportseva.chainlinks.com/tls/ca.crt  --peerAddresses peer0.police.chainlinks.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/peers/peer0.police.chainlinks.com/tls/ca.crt --peerAddresses peer0.airport.chainlinks.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/peers/peer0.airport.chainlinks.com/tls/ca.crt -c '{"Args":["createPassport","1234","photo","123456789010","Vishnu","Pradeep","Chombakaran","address","Indian","Calicut","B+","Male","1997-11-26","2030-03-20"]}'

# peer chaincode query -C auctionchannel -n pass  -c '{"Args":["viewPassport","{\"selector\":{\"aadharNumber\":\"123456789010\"}}"]}'

# peer chaincode invoke -o orderer.chainlinks.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem  -C auctionchannel -n pass --peerAddresses peer0.passportseva.chainlinks.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer0.passportseva.chainlinks.com/tls/ca.crt  --peerAddresses peer0.police.chainlinks.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/peers/peer0.police.chainlinks.com/tls/ca.crt --peerAddresses peer0.airport.chainlinks.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/peers/peer0.airport.chainlinks.com/tls/ca.crt -c '{"Args":["createPoliceRecords","1234","photo","123456789010","Vishnu","Pradeep","Chombakaran","address","Indian","B+","Male","Calicut","High","At 5:22 p.m. on May 12, 2010, I was dispatched to 239 Carol Avenue regarding a theft. Lawrence Cooper (DOB 7-15-1987) reported that his son David’s bicycle had been stolen.Cooper told me:-David (DOB 11-04-2001) had brought the bicycle into the carport the evening before (May 11)-the bicycle wasn’t locked-the bicycle is a blue Sears boys’  bicycle with black tires and black handlebars-the bicycle is three years oldDavid went to the carport after school to ride the bicycle. He saw the bicycle was missing. When his father came home, David told him that the bike had been stolen. Lawrence called the police at 5:20.No one was home all day. Neither David nor Lawrence knows when the bicycle was stolen. They don’t remember whether it was in the carport this morning. They did not hear any unusual noises last night."]}'

# peer chaincode invoke -o orderer.chainlinks.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/chainlinks.com/orderers/orderer.chainlinks.com/msp/tlscacerts/tlsca.chainlinks.com-cert.pem  -C auctionchannel -n pass --peerAddresses peer0.passportseva.chainlinks.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/passportseva.chainlinks.com/peers/peer0.passportseva.chainlinks.com/tls/ca.crt  --peerAddresses peer0.police.chainlinks.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.chainlinks.com/peers/peer0.police.chainlinks.com/tls/ca.crt --peerAddresses peer0.airport.chainlinks.com:11051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/airport.chainlinks.com/peers/peer0.airport.chainlinks.com/tls/ca.crt -c '{"Args":["policeRecordStatusUpdate","1234"]}'
