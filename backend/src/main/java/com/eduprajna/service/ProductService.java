package com.eduprajna.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.eduprajna.entity.Product;
import com.eduprajna.entity.ProductVariant;
import com.eduprajna.repository.CartItemRepository;
import com.eduprajna.repository.OrderItemRepository;
import com.eduprajna.repository.ProductRepository;
import com.eduprajna.repository.ProductVariantRepository;
import com.eduprajna.repository.WishlistItemRepository;

@Service
public class ProductService {

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private Cloudinary cloudinary;

    public List<ProductVariant> getAllVariants() {
        return productVariantRepository.findAll();
    }
 // Get all product variants (for admin and user)
    public ProductVariant getVariantById(Long id) {
        return productVariantRepository.findById(id).orElse(null);
    }

    public Product save(Product p) {
        if (p.getVariants() != null) {
            for (ProductVariant variant : p.getVariants()) {
                variant.setProduct(p);
            }
        }
        return productRepository.save(p);
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void updateVariantStock(Long variantId, int delta) {
        ProductVariant variant = productVariantRepository.findById(variantId).orElse(null);
        if (variant != null) {
            int current = variant.getStockQuantity() != null ? variant.getStockQuantity() : 0;
            int newQty = current + delta;
            variant.setStockQuantity(Math.max(newQty, 0));
            productVariantRepository.save(variant);
        }
    }

    @Transactional
    public void deleteVariant(Long variantId) {
        productVariantRepository.deleteById(variantId);
    }

    public String uploadImage(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());

            return uploadResult.get("secure_url").toString();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Cloudinary upload failed: " + e.getMessage());
        }
    }
}
