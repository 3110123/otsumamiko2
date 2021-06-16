class SnacksController < ApplicationController
  include ActiveModel::Model
  include ActiveModel::Attributes
  include Pagy::Backend
  
  def show
    @snack = Snack.find(params[:id])
    @review = Review.new
    @reviews = @snack.reviews.includes(:user).order(created_at: :desc)
    if @snack.reviews.blank?
      @snack_rate = 0.0
    else
      @snack_rate = @snack.reviews.average(:rate).round(2)
    end
  end

  def index
    @search_snacks_form = SearchSnacksForm.new(search_params)
    @pagy, @snack = pagy_countless(@search_snacks_form.search.includes(:reviews, {image_attachment: :blob}), link_extra: 'data-remote="true"')

    @tags = Tag.all

    if @pagy.page == @pagy.pages
      @next_page = "last"
    else
      @next_page = @pagy.page
    end
  end

  def result
    tags = params[:tag]
    tag = tags.length
    alcohol = params[:alcohol]
    matchAllTags = TagRelationship.where(tag_id: tags).group(:snack_id).select(:snack_id).having('count(snack_id) = ?', tag)
    snackIds = matchAllTags.map(&:snack_id)
    @query = Snack.where(id: snackIds, alcohol: alcohol).sample
    @snack = Snack.find(@query.id)
    @review = Review.new
    @reviews = @snack.reviews.includes(:user).order(created_at: :desc)
    if @snack.reviews.blank?
      @snack_rate = 0.0
    else
      @snack_rate = @snack.reviews.average(:rate).round(2)
    end
  end

  private
  
  def snack_params
    params.require(:snack).permit(:name, :alcohol, :image)
  end

  def search_params
    # ボッチ演算子でnilが来てもエラーにならずnilを返す
    params[:q]&.permit(:name, :alcohol, tag_ids:[])
  end
end
