package be.ehb.werkstuk.controller;

import be.ehb.werkstuk.dao.CategoryDAO;
import be.ehb.werkstuk.dao.ProductDAO;
import be.ehb.werkstuk.model.Category;
import be.ehb.werkstuk.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class IndexController {

    @Autowired
    private ProductDAO productDAO;

    @Autowired
    private CategoryDAO categoryDAO;

    @ModelAttribute("newProduct")
    public Product createNewProduct(){
        return new Product();
    }

    @ModelAttribute("allProducts")
    public Iterable<Product> getAllProducts(){
        return productDAO.getAll();
    }

    @ModelAttribute("allCategories")
    public Iterable<Category> getAllCategories(){
        return categoryDAO.findAll();
    }

    @RequestMapping(value = {"/", "index"}, method = RequestMethod.POST)
    public String showIndex(@RequestParam(value = "category", required = false) int id, ModelMap model){
        if(id == 0){
            List<Product> products = (List<Product>) productDAO.getAll();
            model.addAttribute("filteredProducts", products);
            return "index";
        }
        List<Product> products = (List<Product>) productDAO.getAllByCategory_Id(id);
        model.addAttribute("filteredProducts", products);
        return "index";
    }

    @RequestMapping(value = {"/", "/index"})
    public String index(ModelMap map){
        List<Product> products = (List<Product>) productDAO.getAll();
        map.addAttribute("filteredProducts", products);
        return "index";
    }
}
