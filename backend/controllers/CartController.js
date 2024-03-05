import Cart from "../models/Cart.js";
import { errorHandler } from "../helpers/eventHandler.js";

const cartController = {
  createOrUpdateCart: async (req, res, next) => {
    try {
      const cartData = req.body;
      const cart = await Cart.createOrUpdate(cartData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  deleteCart: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      await Cart.deleteCart(cartId);
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  findCartByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const carts = await Cart.findCartByStatus(status);
      res.status(200).json(carts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  countCarts: async (req, res, next) => {
    try {
      const count = await Cart.countCarts();
      res.status(200).json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  saveOrUpdate: async (req, res, next) => {
    try {
      const cartData = req.body;
      const cart = new Cart(cartData);
      await cart.saveOrUpdate();
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  softDeleteOrRestore: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findById(cartId);
      await cart.softDeleteOrRestore();
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const carts = await Cart.getByField("user_id", userId);
      res.status(200).json(carts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredCarts = await Cart.find().applyFilters(filters);
      res.status(200).json(filteredCarts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const cart = await Cart.getById(cartId);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const carts = await Cart.getAll();
      res.status(200).json(carts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  getByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const carts = await Cart.getByField(field, value);
      res.status(200).json(carts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  addItem: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const itemData = req.body;
      const cart = await Cart.getById(cartId);
      await cart.addItem(itemData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  removeItem: async (req, res, next) => {
    try {
      const { cartId, itemId } = req.params;
      const cart = await Cart.getById(cartId);
      await cart.removeItem(itemId);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  updateItem: async (req, res, next) => {
    try {
      const { cartId, itemId } = req.params;
      const updatedItemData = req.body;
      const cart = await Cart.getById(cartId);
      await cart.updateItem(itemId, updatedItemData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  applyDiscount: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const discountData = req.body;
      const cart = await Cart.getById(cartId);
      await cart.applyDiscount(discountData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  removeDiscount: async (req, res, next) => {
    try {
      const { cartId, discountId } = req.params;
      const cart = await Cart.getById(cartId);
      await cart.removeDiscount(discountId);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  calculateTotal: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const cart = await Cart.getById(cartId);
      await cart.calculateTotal();
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  markAsEmpty: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const cart = await Cart.getById(cartId);
      await cart.markAsEmpty();
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  setShippingAddress: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const addressData = req.body;
      const cart = await Cart.getById(cartId);
      await cart.setShippingAddress(addressData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  setBillingAddress: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const addressData = req.body;
      const cart = await Cart.getById(cartId);
      await cart.setBillingAddress(addressData);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  setBillingSameAsShipping: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const isSame = req.body.isSame;
      const cart = await Cart.getById(cartId);
      await cart.setBillingSameAsShipping(isSame);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
  setPaymentMethod: async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const paymentMethod = req.body.paymentMethod;
      const cart = await Cart.getById(cartId);
      await cart.setPaymentMethod(paymentMethod);
      res.status(200).json(cart);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default cartController;
