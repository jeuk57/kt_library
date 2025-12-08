import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Paper, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { mockBooks } from '../data/mockBooks';

export default function BookCreate() {
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate(); //페이지 이동 도구 준비
    const isEditMode = !!id; // id가 있으면 등록페이지를 수정모드로 전황

    const [formData, setFormData] = useState({
        title: '',
        language: '',
        genre: '',
        content: ''
    }); //기억해줄 값(수정페이지에서 사용)

    const [coverImage, setCoverImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // 수정 모드일 때 기존 데이터 불러오기
    useEffect(() => { //페이지가 열릴때 자동으로 실행
        if (isEditMode) { //수정모드일때만 실행
            const book = mockBooks.find(b => b.id === parseInt(id));
            if (book) {
                setFormData({
                    title: book.title || '',
                    language: '한국어', // Mock 데이터에 없으면 기본값
                    genre: book.genre || '',
                    content: book.description || ''
                });
                setCoverImage(book.coverImage || null);
            }
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGenerateCover = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setCoverImage('https://via.placeholder.com/300x400/4A90E2/ffffff?text=AI+Generated+Cover');
            setIsGenerating(false);
            alert('표지가 생성되었습니다!');
        }, 2000);
    };

    const handleSubmit = () => {
        if (!coverImage) {
            alert('먼저 표지를 생성해주세요!');
            return;
        }

        console.log(isEditMode ? '수정 데이터:' : '등록 데이터:', {
            ...formData,
            coverImage
        });

        alert(isEditMode ? '도서가 수정되었습니다!' : '도서가 등록되었습니다!');
        navigate('/mypage');
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8f9fa',
            py: 6,
            px: 2
        }}>
            <Box sx={{
                maxWidth: 1100,
                mx: 'auto'
            }}>
                {/* 제목 */}
                <Typography
                    variant="h4"
                    sx={{
                        mb: 5,
                        textAlign: 'center',
                        fontWeight: 700,
                        color: '#212529'
                    }}
                >
                    {isEditMode ? '도서 수정' : '도서 등록'}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: 5,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    mb: 5
                }}>
                    {/* 왼쪽: 표지 미리보기 */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3
                    }}>
                        <Paper
                            elevation={0}
                            sx={{
                                width: 320,
                                height: 450,
                                bgcolor: '#e9ecef',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundImage: coverImage ? `url(${coverImage})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 2,
                                border: '1px solid #dee2e6'
                            }}
                        >
                            {!coverImage && (
                                <Typography variant="h6" color="text.secondary">
                                    표지 미리보기
                                </Typography>
                            )}
                        </Paper>

                        <Button
                            variant="contained"
                            onClick={handleGenerateCover}
                            disabled={isGenerating || !formData.title || !formData.content}
                            sx={{
                                width: 220,
                                py: 1.5,
                                bgcolor: '#adb5bd',
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: 600,
                                borderRadius: 1.5,
                                boxShadow: 'none',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#868e96',
                                    boxShadow: 'none'
                                },
                                '&:disabled': {
                                    bgcolor: '#dee2e6',
                                    color: '#adb5bd'
                                }
                            }}
                        >
                            {isGenerating ? '생성 중...' : '표지 생성'}
                        </Button>
                    </Box>

                    {/* 오른쪽: 입력 폼 */}
                    <Paper
                        elevation={0}
                        sx={{
                            width: 550,
                            p: 4,
                            borderRadius: 2,
                            bgcolor: '#fff',
                            border: '1px solid #dee2e6'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                            {/* 1. 제목 */}
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '15px', color: '#495057' }}>
                                    1. 제목을 입력하시오
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="책 제목을 입력하세요"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#f1f3f5',
                                            borderRadius: 1.5,
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* 2. 언어 */}
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '15px', color: '#495057' }}>
                                    2. 언어를 선택하시오
                                </Typography>
                                <FormControl fullWidth size="small">
                                    <Select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        displayEmpty
                                        sx={{
                                            bgcolor: '#f1f3f5',
                                            borderRadius: 1.5,
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <MenuItem value="" disabled>언어를 선택하세요</MenuItem>
                                        <MenuItem value="한국어">한국어</MenuItem>
                                        <MenuItem value="영어">영어</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* 3. 장르 */}
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '15px', color: '#495057' }}>
                                    3. 장르를 입력하시오
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    placeholder="예: 판타지, 로맨스, SF"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#f1f3f5',
                                            borderRadius: 1.5,
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* 4. 내용 */}
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '15px', color: '#495057' }}>
                                    4. 내용을 입력하시오
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    multiline
                                    rows={6}
                                    placeholder="책의 내용을 입력해주세요"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: '#f1f3f5',
                                            borderRadius: 1.5,
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {/* 등록/수정 버튼 */}
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!coverImage}
                        sx={{
                            width: 280,
                            py: 1.8,
                            bgcolor: '#4285f4',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: 1.5,
                            boxShadow: 'none',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#3367d6',
                                boxShadow: 'none'
                            },
                            '&:disabled': {
                                bgcolor: '#dee2e6',
                                color: '#adb5bd'
                            }
                        }}
                    >
                        {isEditMode ? '수정' : '등록'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}