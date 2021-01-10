package be.ehb.backend.controller;

import be.ehb.backend.dao.CategoryDAO;
import be.ehb.backend.dao.ProductDAO;
import be.ehb.backend.dao.ProductOrderDAO;
import be.ehb.backend.entity.Category;
import be.ehb.backend.entity.Product;
import be.ehb.backend.entity.ProductOrder;
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
    private ProductOrderDAO productOrderDAO;

    @Autowired
    public APIController(ProductDAO productDAO, CategoryDAO categoryDAO, ProductOrderDAO productOrderDAO) {
        this.productDAO = productDAO;
        this.categoryDAO = categoryDAO;
        this.productOrderDAO = productOrderDAO;
    }

    // Get a product by ID
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Product getProductById(@PathVariable int id){
        return productDAO.findById(id);
    }

    // Get all the products
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Product> getAllProducts(@Nullable @RequestParam("category") String category) {
        if (category == null) {
            return productDAO.findAll();
        }
        return productDAO.findAllByCategory_Name(category);
    }

    // Get all order by a username
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/productorders", method = RequestMethod.GET)
    @ResponseBody
    public Iterable getAllOrdersByUsername(@RequestParam("username") String username){
        return productOrderDAO.findAllByUsername(username);
    }

    // Show the categories
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Category> showAllCategories(){
        return categoryDAO.findAll();
    }

    // Delete a product by ID
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

    // Add an order
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/orders", method = RequestMethod.POST)
    @ResponseBody
    public HttpStatus addOrder(@RequestParam("username") String username, @RequestParam("products") String products, @RequestParam("total") double total, @RequestParam("payment") String payment){
        try{
            ProductOrder order = new ProductOrder();
            order.setUsername(username);
            order.setProducts(products);
            order.setTotal(total);
            order.setPaymentmethod(payment);
            productOrderDAO.save(order);
            return HttpStatus.OK;
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST;
        }
    }
}
