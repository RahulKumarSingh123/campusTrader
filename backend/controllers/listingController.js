const Listing = require('../models/listingSchema');
const mongoose = require('mongoose');

const addListingController = async(req, res) => {
    try {
        const newListing = await req.body;
        console.log(newListing);
        newListing.owner = req.user._id;
        console.log(req.file);
        newListing.imageName = await req.file.filename;
        const addedListing = await Listing.create(newListing);
        if (addedListing) {
            res.status(201).json({
                success: true,
                message: 'listing added successfully',
            });
        } else {
            res.status(400).json({
                success: false,
                messsage: 'Listing not created try again',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const getAllListingController = async(req, res) => {
    try {
        const listings = await Listing.find().populate('owner');
        if (listings) {
            res.status(200).json({
                success: true,
                message: 'Listings fetched',
                data: listings,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Listings not found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const getMyListingController = async(req, res) => {
    try {
        const id = req.user._id;
        console.log(id);
        const objId = new mongoose.Types.ObjectId(id);
        console.log(objId);

        const listings = await Listing.find({ owner: objId }).populate('owner');
        console.log(listings);
        if (listings) {
            res.status(200).json({
                success: true,
                message: 'Listings fetched',
                data: listings,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Listings not found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

const getListingController = async(req, res) => {
    try {
        const id = req.params.id;
        const listing = await Listing.findById(id).populate('owner');
        if (listing) {
            res.status(200).json({
                success: true,
                message: 'Listing fetched',
                data: listing,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const updateListingController = async(req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const updatedListing = await Listing.findByIdAndUpdate(id, newData, { New: true });
        if (updatedListing) {
            res.status(201).json({
                success: true,
                message: 'Listing updated successfully',
                data: updatedListing,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const updateImageController = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedListing = await Listing.findByIdAndUpdate(id, {
            imageName: req.file.filename,
        });

        if (updatedListing) {
            res.status(201).json({
                success: true,
                message: 'listing updated successfully',
                data: updatedListing,
            });
        } else {
            res.status(400).json({
                success: false,
                messsage: 'Listing not found try again',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(504).json({
            success: false,
            message: 'Listing not found',
        });
    }
};

const deleteListingController = async(req, res) => {
    try {
        const id = req.params.id;
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (deletedListing) {
            res.status(200).json({
                success: true,
                message: 'Listing deleted successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Listiing not found',
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

const searchListingController = async(req, res) => {
    try {
        const { listing } = req.query;
        if (!listing) {
            req.status(400).json({
                success: false,
                message: 'Search field not found',
            });
        }
        const listings = await Listing.find({ itemName: { $regex: listing, $options: 'i' } });
        console.log(listings);
        if (listing.length == 0) {
            res.status(200).json({
                success: true,
                message: 'No products found',
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Products found',
                data: listings,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

module.exports = {
    addListingController,
    getAllListingController,
    getListingController,
    updateListingController,
    updateImageController,
    deleteListingController,
    searchListingController,
    getMyListingController,
};