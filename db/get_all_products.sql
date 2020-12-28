SELECT p.id, p.name, p.description, p.price, 
(SELECT json_agg((json_build_object('id', pi.id, 'url', pi.url))) FROM products_images pi WHERE product_id = p.id) AS images 
FROM products p