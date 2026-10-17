/**
 * Chuyển đổi linh hoạt các định dạng link ảnh, bao gồm cả Google Drive share link
 * sang direct image URL để thẻ <img> hiển thị được bình thường.
 */
export function formatImageUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Kiểm tra nếu là link Google Drive
  // Định dạng 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Định dạng 2: https://drive.google.com/open?id=FILE_ID
  // Định dạng 3: https://drive.google.com/uc?id=FILE_ID
  if (trimmed.includes('drive.google.com')) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Google User Content CDN thumbnail URL tải trực tiếp cực nhanh và không bị CORS
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Dropbox share link: chuyển ?dl=0 thành ?raw=1
  if (trimmed.includes('dropbox.com') && trimmed.includes('dl=0')) {
    return trimmed.replace('dl=0', 'raw=1');
  }

  return trimmed;
}
