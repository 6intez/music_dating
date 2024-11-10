require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get my_profile" do
    get users_my_profile_url
    assert_response :success
  end
end
