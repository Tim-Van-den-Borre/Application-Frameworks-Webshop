package be.ehb.werkstuk.controller;

import be.ehb.werkstuk.dao.ProductDAO;
import be.ehb.werkstuk.model.Category;
import be.ehb.werkstuk.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class ProductController {

    @Autowired
    private ProductDAO repo;

    @ModelAttribute("allProducts")
    public Iterable<Product> getAllProducts(){
        return repo.findAll();
    }

    @ModelAttribute("newProduct")
    public Product createNewProduct(){
        return new Product();
    }

    @RequestMapping(value = {"/", "/index"})
    public String index(ModelMap map){
        return "index";
    }
}
