<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:31
 */

class Products_model extends CI_Model{
    public $variable;

    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = false)
    {
        if($id == false)
        {
            $q =  $this->db->get('products');
            $q = $q->result();
        } else
        {
            $this->db->where('id', $id);
            $q =  $this->db->get('products');
            $q = $q->row();
        }

        return $q;
    }

    public function update($product)
    {
        $this->db->where('id', $product['id']);
        $this->db->update('products', $product);
    }

    public function create($product)
    {
        $this->db->insert('products', $product);
    }

    public function delete($product)
    {
        $this->db->where('id', $product['id']);
        $this->db->delete('products', $product);
    }
}