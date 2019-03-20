<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:00
 */

class Products extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);
        $this->load->model('admin/Products_model');
    }

    /**
     * @return object
     */
    public function get($id = false)
    {
        $output = $this->Products_model->get($id);

       echo json_encode($output);
    }

    public function update()
    {
        $product = $this->input->post('product');
        $this->Products_model->update($product);
    }

    public function create()
    {
        $product = $this->input->post('product');
        $this->Products_model->create($product);
    }

    public function delete()
    {
        $product = $this->input->post('product');
        $this->Products_model->delete($product);
    }
}