require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get home_index_url
    assert_response :success
  end

  test "should get resume" do
    get home_resume_url
    assert_response :success
  end

  test "should get detail" do
    get home_detail_url
    assert_response :success
  end

end
