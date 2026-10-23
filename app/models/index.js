const User = require('./User');
const Avatar = require('./Avatar');
const Item = require('./Item');
const NFT = require('./NFT');
const UserItem = require('./UserItem');
const SellingNFT = require('./SellingNFT');
const UserWallet = require('./UserWallet');
const NFTType = require('./NFTType');
const Session = require('./Session');
const LiveStream = require('./LiveStream');

// Define associations
User.belongsTo(Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
Avatar.hasMany(User, { foreignKey: 'avatar_id', as: 'users' });

// LiveStream associations
LiveStream.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
User.hasMany(LiveStream, { foreignKey: 'created_by', as: 'liveStreams' });

User.hasMany(UserItem, { foreignKey: 'user_id', as: 'userItems' });
UserItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Item.hasMany(UserItem, { foreignKey: 'item_id', as: 'userItems' });
UserItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

User.hasMany(UserWallet, { foreignKey: 'user_id', as: 'wallets' });
UserWallet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

NFT.belongsTo(SellingNFT, { foreignKey: 'id', targetKey: 'nft_id', as: 'selling' });
SellingNFT.belongsTo(NFT, { foreignKey: 'nft_id', as: 'nft' });

module.exports = {
    User,
    Avatar,
    Item,
    NFT,
    UserItem,
    SellingNFT,
    UserWallet,
    NFTType,
    Session
};