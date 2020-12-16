package be.ehb.backend.controller;

import be.ehb.backend.dao.CategoryDAO;
import be.ehb.backend.dao.OrdersDAO;
import be.ehb.backend.dao.ProductDAO;
import be.ehb.backend.dao.ProductOrderDAO;
import be.ehb.backend.entity.Category;
import be.ehb.backend.entity.Orders;
import be.ehb.backend.entity.Product;
import be.ehb.backend.entity.ProductOrder;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
public class APIController {

    private ProductDAO productDAO;
    private CategoryDAO categoryDAO;
    private OrdersDAO ordersDAO;
    private ProductOrderDAO productOrderDAO;

    @Autowired
    public APIController(ProductDAO productDAO, CategoryDAO categoryDAO, OrdersDAO ordersDAO, ProductOrderDAO productOrderDAO) {
        this.productDAO = productDAO;
        this.categoryDAO = categoryDAO;
        this.ordersDAO = ordersDAO;
        this.productOrderDAO = productOrderDAO;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/users/order", method = RequestMethod.POST)
    @ResponseBody
    public HttpStatus insertOrder(@RequestParam("userID") int userID){
        Orders order = new Orders();
        order.setUserID(userID);
        ordersDAO.save(order);
        return HttpStatus.OK;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/users/linkorder", method = RequestMethod.POST)
    @ResponseBody
    public HttpStatus linkOrder(@RequestParam("orderID") int orderID, @RequestParam("productID") int productID){
        ProductOrder link = new ProductOrder();
        link.setOrderID(orderID);
        link.setProductID(productID);
        productOrderDAO.save(link);
        return HttpStatus.OK;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Product getProductById(@PathVariable int id){
        return productDAO.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Product> getAllProducts(@Nullable @RequestParam("category") String category) {
        if (category == null) {
            return productDAO.findAll();
        }
        return productDAO.findAllByCategory_Name(category);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Category> showAllCategories(){
        return categoryDAO.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public HttpStatus deleteProductById(@PathVariable(name = "id") int id){
        if(productDAO.existsById(id)){
            productDAO.deleteById(id);
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }
}
